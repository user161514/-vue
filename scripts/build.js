// 打包脚本：解决 esbuild 在 Windows 上删除系统临时目录文件被拒
// （Error: remove C:\...\Temp\esbuild-xxx: Access is denied）导致的打包失败。
//
// 做两件事：
//   1. 把 TEMP / TMP 指到项目内的 .tmp 目录，不再使用系统 Temp。
//      这样 esbuild 写的临时文件不落在被安全软件（火绒）重点扫描的系统 Temp 里，
//      减少「文件被瞬时占用、删不掉」的概率。
//   2. 万一仍然偶发失败，自动重试一次。
//
// 用法：npm run build

const path = require('path')
const fs = require('fs')
const { spawnSync } = require('child_process')

const projectRoot = path.join(__dirname, '..')
const tmpDir = path.join(projectRoot, '.tmp')
const viteBin = path.join(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js')

if (fs.existsSync(viteBin) === false) {
  console.error('[build] 找不到 vite，请先在项目目录执行 npm install')
  process.exit(1)
}

fs.mkdirSync(tmpDir, { recursive: true })

const buildEnv = Object.assign({}, process.env)
buildEnv.TEMP = tmpDir
buildEnv.TMP = tmpDir

const maxAttempt = 2
let attempt = 0
let ok = false

while (attempt < maxAttempt && ok === false) {
  attempt = attempt + 1
  console.log('[build] 第 ' + attempt + ' 次构建，临时目录：' + tmpDir)

  const result = spawnSync(process.execPath, [viteBin, 'build'], {
    cwd: projectRoot,
    stdio: 'inherit',
    env: buildEnv
  })

  if (result.status === 0) {
    ok = true
  } else {
    console.log('[build] 第 ' + attempt + ' 次构建失败，退出码：' + result.status)
  }
}

if (ok === false) {
  console.error('')
  console.error('[build] 构建仍然失败。')
  console.error('  请把下面两个路径加入火绒「信任区」后重试：')
  console.error('    1) ' + tmpDir)
  console.error('    2) ' + projectRoot)
  process.exit(1)
}

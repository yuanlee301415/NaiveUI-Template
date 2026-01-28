/*
 * 初始加载动画 插件
 * */

import systemLogo from '/favicon.svg?raw'

const TITLE = import.meta.env.VITE_APP_TITLE

// 初始加载动画
export function setupLoading() {
  const themeColor = '#646cff'
  const primaryColor = `--primary-color: ${themeColor}`
  const loadingClasses = [
    'left-0 top-0',
    'left-0 bottom-0 animate-delay-500',
    'right-0 top-0 animate-delay-1000',
    'right-0 bottom-0 animate-delay-1500',
  ]
  const logoWithClass = systemLogo.replace('<svg', `<svg class="size-120px text-primary" style="color:${themeColor};width:20rem;height:20rem;"`)
  const dot = loadingClasses
    .map((item) => `<div class='absolute w-16px h-16px bg-primary rounded-8px animate-pulse ${item}' style='background: ${themeColor}'></div>`)
    .join('\n')
  const loading = `
<div class='fixed-center flex-col' style='${primaryColor};opacity:0.55'>
  ${logoWithClass}
  <div class='w-56px h-56px my-36px'>
    <div class='relative h-full animate-spin'>
      ${dot}
    </div>
  </div>
  <h2 class='text-28px font-500 text-#646464'>${TITLE}</h2>
</div>`

  const app = document.getElementById('app')
  if (app) {
    app.innerHTML = loading
  }
}

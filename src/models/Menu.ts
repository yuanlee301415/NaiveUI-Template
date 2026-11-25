/*
 * 导航菜单
 * */

export class Menu {
  /** 路径 */
  path: string

  /** 名称 */
  title: string

  /** 图标 */
  icon?: string

  /** 嵌套深度 */
  depth: number

  /** 子菜单 */
  children: Menu[] | null

  constructor(_: Partial<Menu> = {}) {
    const { path = '', title = '', icon, depth = 1, children = null } = _
    this.path = path
    this.title = title
    this.icon = icon
    this.depth = depth
    this.children = children
  }

  /**
   * 批量实例化
   */
  static from(list?: Partial<Menu>[]): Menu[] | undefined {
    return list?.map((_) => new Menu(_))
  }
}

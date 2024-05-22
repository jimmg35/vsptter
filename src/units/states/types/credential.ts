export type ServerConnectionStatus = 'success' | 'failed' | 'connecting'
export type ViewingMode = 'logged' | 'guest' | 'not-decided'
export type StatusType = 'none' | 'logging' | 'loading' | 'guest' | 'logged'

export const StatusTypeMap: Record<StatusType, string> = {
  none: '',
  logging: '登入中',
  loading: '載入中',
  guest: '訪客模式',
  logged: '鄉民'
}

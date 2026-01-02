declare namespace YT {
  interface Player {
    destroy(): void
    playVideo(): void
    pauseVideo(): void
    stopVideo(): void
    getPlayerState(): number
    mute(): void
    unMute(): void
    isMuted(): boolean
    setVolume(volume: number): void
    getVolume(): number
  }

  interface PlayerOptions {
    videoId: string
    width?: number | string
    height?: number | string
    playerVars?: PlayerVars
    events?: Events
  }

  interface PlayerVars {
    autoplay?: 0 | 1
    mute?: 0 | 1
    rel?: 0 | 1
    modestbranding?: 0 | 1
    controls?: 0 | 1
    showinfo?: 0 | 1
  }

  interface Events {
    onReady?: (event: PlayerEvent) => void
    onStateChange?: (event: OnStateChangeEvent) => void
    onError?: (event: OnErrorEvent) => void
  }

  interface PlayerEvent {
    target: Player
  }

  interface OnStateChangeEvent {
    target: Player
    data: number
  }

  interface OnErrorEvent {
    target: Player
    data: number
  }

  const PlayerState: {
    UNSTARTED: -1
    ENDED: 0
    PLAYING: 1
    PAUSED: 2
    BUFFERING: 3
    CUED: 5
  }

  class Player {
    constructor(element: HTMLElement | string, options: PlayerOptions)
  }
}

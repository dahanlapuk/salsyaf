'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './YouTubePopup.module.css'

interface YouTubePopupProps {
    videoId: string
    autoClose?: number // seconds before close button appears
}

declare global {
    interface Window {
        YT: typeof YT
        onYouTubeIframeAPIReady: () => void
    }
}

export default function YouTubePopup({ videoId, autoClose = 2 }: YouTubePopupProps) {
    const [isOpen, setIsOpen] = useState(true)
    const [canClose, setCanClose] = useState(false)
    const playerRef = useRef<YT.Player | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Enable close after delay
        const timer = setTimeout(() => {
            setCanClose(true)
        }, autoClose * 1000)
        return () => clearTimeout(timer)
    }, [autoClose])

    useEffect(() => {
        // Load YouTube IFrame API
        if (!window.YT) {
            const tag = document.createElement('script')
            tag.src = 'https://www.youtube.com/iframe_api'
            const firstScriptTag = document.getElementsByTagName('script')[0]
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
        }

        const initPlayer = () => {
            if (containerRef.current && window.YT && window.YT.Player) {
                playerRef.current = new window.YT.Player(containerRef.current, {
                    videoId: videoId,
                    playerVars: {
                        autoplay: 1,
                        mute: 0,
                        rel: 0,
                        modestbranding: 1,
                    },
                    events: {
                        onStateChange: (event: YT.OnStateChangeEvent) => {
                            // YT.PlayerState.ENDED = 0
                            if (event.data === 0) {
                                setIsOpen(false)
                            }
                        },
                    },
                })
            }
        }

        if (window.YT && window.YT.Player) {
            initPlayer()
        } else {
            window.onYouTubeIframeAPIReady = initPlayer
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy()
            }
        }
    }, [videoId])

    const handleClose = () => {
        if (canClose) {
            setIsOpen(false)
        }
    }

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && canClose) {
            setIsOpen(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className={styles.overlay} onClick={handleBackdropClick}>
            <div className={styles.popup}>
                <div className={styles.header}>
                    {canClose && (
                        <button 
                            className={styles.closeBtn}
                            onClick={handleClose}
                            aria-label="Close popup"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    )}
                </div>
                <div className={styles.videoContainer}>
                    <div ref={containerRef} className={styles.video} />
                </div>
            </div>
        </div>
    )
}

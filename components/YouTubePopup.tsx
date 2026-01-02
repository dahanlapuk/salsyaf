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
    const [isMuted, setIsMuted] = useState(true)
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
                        mute: 1,  // Harus mute agar autoplay berfungsi di browser modern
                        rel: 0,
                        modestbranding: 1,
                    },
                    events: {
                        onReady: (event: YT.PlayerEvent) => {
                            // Coba unmute setelah user interaction
                            event.target.playVideo()
                        },
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

    const handleUnmute = () => {
        if (playerRef.current) {
            playerRef.current.unMute()
            setIsMuted(false)
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
                    {isMuted && (
                        <button 
                            className={styles.unmuteBtn}
                            onClick={handleUnmute}
                            aria-label="Unmute video"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                            </svg>
                            <span>Klik untuk suara</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

 
'use client'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

const PinProcted = ({ pin, rpin }: { pin: string, rpin: string[] }) => {
    const [pinValue, setPinValue] = useState<string[]>(['', '', '', ''])
    const [storedPin, setStoredPin] = useState<string | null>(null)
    const [attempts, setAttempts] = useState<number>(0)
    const [lockoutTime, setLockoutTime] = useState<number | null>(null)
    const [countdown, setCountdown] = useState<number>(0)

    const inputsRef = useRef<HTMLInputElement[]>([])

    useEffect(() => {
        const savedPin = window.localStorage.getItem('pin')
        const savedAttempts = parseInt(localStorage.getItem('pin_attempts') || '0')
        const savedLockTime = parseInt(localStorage.getItem('pin_lockout') || '0')

        setAttempts(savedAttempts)
        if (savedLockTime && savedLockTime > Date.now()) {
            setLockoutTime(savedLockTime)
        }

        if (savedPin === pin) {
            setStoredPin(savedPin)
            localStorage.removeItem('pin_attempts')
            rpin.push(savedPin)
        }
    }, [pin, rpin])

    useEffect(() => {
        if (lockoutTime) {
            const interval = setInterval(() => {
                const now = Date.now()
                if (lockoutTime > now) {
                    const remaining = Math.ceil((lockoutTime - now) / 1000)
                    setCountdown(remaining)
                } else {
                    setLockoutTime(null)
                    localStorage.removeItem('pin_lockout')
                    setAttempts(0)
                    localStorage.setItem('pin_attempts', '0')
                    setCountdown(0)
                }
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [lockoutTime])

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return

        const newPin = [...pinValue]
        newPin[index] = value
        setPinValue(newPin)

        if (value && index < 3) {
            inputsRef.current[index + 1]?.focus()
        }

        if (newPin.every((d) => d !== '')) {
            const fullPin = newPin.join('')
            if (fullPin === pin) {
                window.localStorage.setItem('pin', fullPin)
                setStoredPin(fullPin)
                rpin.push(fullPin)
            } else {
                const newAttempts = attempts + 1
                setAttempts(newAttempts)
                localStorage.setItem('pin_attempts', newAttempts.toString())

                if (newAttempts >= 5) {
                    const lockUntil = Date.now() + 60 * 1000
                    setLockoutTime(lockUntil)
                    localStorage.setItem('pin_lockout', lockUntil.toString())
                    toast.error('Too many attempts. Try again in 1 minute.')
                } else {
                    toast.error(`Invalid Pin. Attempt ${newAttempts}/5`)
                }

                setPinValue(['', '', '', ''])
                inputsRef.current[0]?.focus()
            }
        }
    }

    if (storedPin === pin) return null

    return (
        <div className='absolute -top-[100px] left-0 w-full h-[110%] bg-[#00000033] backdrop-blur-lg z-[200] flex  justify-center max-md:items-start items-'>
            <div className='flex flex-col items-center mt-[400px]  gap-6'>
                <h1 className='font-mono max-md:text-lg text-4xl font-bold'>Admin Panel is PIN Protected</h1>
                {lockoutTime ? (
                    <p className="text-red-500 font-semibold">Too many attempts. Try again in {countdown}s</p>
                ) : (
                    <div className='flex gap-4'>
                        {pinValue.map((digit, idx) => (
                            <input
                                key={idx}
                                ref={(el) => { inputsRef.current[idx] = el! }}
                                type='text'
                                inputMode='numeric'
                                maxLength={1}
                                disabled={!!lockoutTime}
                                className='w-24 h-24 max-md:w-12 max-md:h-12 bg-transparent text-center max-md:text-base text-3xl border-2 border-[#ffffff28] rounded-2xl focus:outline-none focus:border-[#ffffff] transition duration-200'
                                value={digit}
                                onChange={(e) => handleChange(idx, e.target.value)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PinProcted

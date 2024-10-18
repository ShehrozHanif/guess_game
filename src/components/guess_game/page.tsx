"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Pause, Play, RotateCcw } from "lucide-react"

export default function Component() {
  const [targetNumber, setTargetNumber] = useState(0)
  const [guess, setGuess] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      setTargetNumber(Math.floor(Math.random() * 10) + 1)
      setMessage("Make a guess!")
      setAttempts(0)
      setShowAnswer(false)
    }
  }, [isPlaying])

  const handleGuess = () => {
    if (!isPlaying) return

    const guessNumber = parseInt(guess)
    setAttempts((prev) => prev + 1)

    if (guessNumber === targetNumber) {
      setMessage(`Congratulations! You guessed it in ${attempts + 1} attempts!`)
      setIsPlaying(false)
    } else if (guessNumber < targetNumber) {
      setMessage("Too low! Try a higher number.")
    } else {
      setMessage("Too high! Try a lower number.")
    }

    setGuess("")
  }

  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
    if (!isPlaying) {
      setGuess("")
      setMessage("")
    }
  }

  const revealAnswer = () => {
    setShowAnswer(true)
    setIsPlaying(false)
  }

  return (
    <div className="flex h-screen justify-center items-center">
        <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Number Guessing Game</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center space-x-2">
          <Button onClick={togglePlay} variant={isPlaying ? "destructive" : "default"}>
            {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isPlaying ? "Pause" : "Start"}
          </Button>
          <Button onClick={() => setIsPlaying(true)} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Input
                type="number"
                placeholder="Enter your guess (1-10)"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleGuess()}
                className="w-full"
                min="1"
                max="10"
              />
              <Button onClick={handleGuess} className="w-full mt-2">
                Guess
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="text-center font-semibold"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>Attempts: {attempts}</div>
        {!isPlaying && targetNumber !== 0 && (
          <Button onClick={revealAnswer} variant="ghost">
            See Answer
          </Button>
        )}
      </CardFooter>
      <AnimatePresence>
        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center pb-4 font-bold text-xl"
          >
            The number was: {targetNumber}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
    </div>
  )
}
import React, { useState, useEffect } from 'react'
import { Question } from '../types'
import Confetti from 'react-confetti'

interface QuizQuestionProps {
  question: Question
  onAnswer: (answer: string) => void
  currentQuestion: number
  totalQuestions: number
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  currentQuestion,
  totalQuestions
}) => {
  const [answer, setAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedAnswer = answer.trim().toLowerCase()
    const isAnswerCorrect = trimmedAnswer === question.correctAnswer.toLowerCase()
    setIsCorrect(isAnswerCorrect)
    setShowFeedback(true)
    if (isAnswerCorrect) {
      setShowConfetti(true)
    }
    setTimeout(() => {
      setShowFeedback(false)
      onAnswer(answer)
      setAnswer('')
    }, 1500)
  }

  return (
    <div className={`p-4 rounded-lg ${showFeedback ? (isCorrect ? 'bg-green-100' : 'bg-red-100') : ''}`}>
      {showConfetti && <Confetti />}
      <p className="text-sm font-semibold text-gray-500 mb-2">
        Question {currentQuestion} of {totalQuestions}
      </p>
      <h2 className="text-xl font-bold mb-4">{question.question}</h2>
      {question.type === 'image' && question.image && (
        <img src={question.image} alt="Question" className="w-full mb-4 rounded-lg" />
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Type your answer here"
          disabled={showFeedback}
          required
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          disabled={showFeedback}
        >
          Submit Answer
        </button>
      </form>
      {showFeedback && (
        <p className={`mt-4 font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
          {isCorrect ? 'Correct!' : `Incorrect. The correct answer is: ${question.correctAnswer}`}
        </p>
      )}
    </div>
  )
}

export default QuizQuestion
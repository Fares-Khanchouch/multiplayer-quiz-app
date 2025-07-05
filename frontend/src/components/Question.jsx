// frontend/src/components/Question.jsx
import React, { useState, useEffect } from 'react';
import './Question.css'; // Specific styles for Question

function Question({ question, onAnswer, timeLeft, totalTime }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [freeTextAnswer, setFreeTextAnswer] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    // Reset state when a new question arrives
    setSelectedAnswer(null);
    setFreeTextAnswer('');
    setHasAnswered(false);
  }, [question?.questionId]);

  const handleMultipleChoiceAnswer = (choice) => {
    if (!hasAnswered) {
      setSelectedAnswer(choice);
      setHasAnswered(true);
      onAnswer(question.questionId, choice);
    }
  };

  const handleFreeTextSubmit = (e) => {
    e.preventDefault();
    if (!hasAnswered && freeTextAnswer.trim() !== '') {
      setHasAnswered(true);
      onAnswer(question.questionId, freeTextAnswer);
    }
  };

  const progressPercentage = (timeLeft / totalTime) * 100;

  if (!question) {
    return (
      <div className="question-container card">
        <div className="loading">
          <div className="loading-spinner"></div>
          Loading question...
        </div>
      </div>
    );
  }

  return (
    <div className="question-container card">
      <div className="timer-section mb-4">
        <div className="timer-bar-wrapper">
          <div 
            className="timer-bar" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="timer-text">
          {Math.max(0, Math.ceil(timeLeft))}s left
        </div>
      </div>

      <h3 className="question-text mb-4">{question.question}</h3>

      {question.type === 'multiple_choice' && question.choices && (
        <div className="choices-grid">
          {question.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleMultipleChoiceAnswer(choice)}
              className={`choice-button ${
                selectedAnswer === choice ? 'selected' : ''
              } ${
                hasAnswered && selectedAnswer !== choice ? 'answered-other' : ''
              }`}
              disabled={hasAnswered || timeLeft <= 0}
            >
              {choice}
            </button>
          ))}
        </div>
      )}

      {question.type === 'free_text' && (
        <form onSubmit={handleFreeTextSubmit} className="free-text-form">
          <div className="input-group mb-3">
            <input
              type="text"
              value={freeTextAnswer}
              onChange={(e) => setFreeTextAnswer(e.target.value)}
              placeholder="Type your answer here..."
              disabled={hasAnswered || timeLeft <= 0}
              className="free-text-input"
            />
          </div>
          <button 
            type="submit" 
            className="btn-primary"
            disabled={hasAnswered || timeLeft <= 0 || !freeTextAnswer.trim()}
          >
            Submit Answer
          </button>
        </form>
      )}

      {hasAnswered && timeLeft > 0 && (
        <div className="answered-message success mt-3">
          ✓ Answer submitted! Waiting for next question...
        </div>
      )}
      
      {timeLeft <= 0 && !hasAnswered && (
        <div className="time-up-message error mt-3">
          ⏰ Time's up!
        </div>
      )}
      
      {timeLeft <= 0 && hasAnswered && (
        <div className="time-up-message mt-3">
          ⏰ Time's up! Answer submitted.
        </div>
      )}
    </div>
  );
}

export default Question;

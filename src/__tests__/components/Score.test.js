import {render, screen, getNodeText, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import Score from '~su/components/Score'

const baseProps = {
  availableScoresList: ['bad', 'intermediate', 'good']
}

describe('Score', () => {
  describe("when score is 'good'", () => {
    const props = {
      ...baseProps,
      score: 'good'
    }

    it('should render correctly', () => {
      render(<Score {...props} />)

      const fullStars = document.querySelectorAll('.ant-rate-star-full');
      expect(fullStars.length).toBe(3);
    })
  })

  describe("when score is 'intermediate'", () => {
    const props = {
      ...baseProps,
      score: 'intermediate'
    }

    it('should render correctly', () => {
      render(<Score {...props} />)

      const fullStars = document.querySelectorAll('.ant-rate-star-full');
      expect(fullStars.length).toBe(2);
    })
  })

  describe("when score is 'bad'", () => {
    const props = {
      ...baseProps,
      score: 'bad'
    }

    it('should render correctly', () => {
      render(<Score {...props} />)

      const fullStars = document.querySelectorAll('.ant-rate-star-full');
      expect(fullStars.length).toBe(1);
    })
  })
})

import React from 'react'
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import IndexPage from '../pages'
 
test('Page', () => {
  render(<IndexPage />)
  expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined()
})
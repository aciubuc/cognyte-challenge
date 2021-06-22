import { render, screen } from '@testing-library/react';
import App from './App';

test('renders residences link', () => {
  render(<App />);
  const linkElement = screen.getByText(/residences/i);
  expect(linkElement).toBeInTheDocument();
});

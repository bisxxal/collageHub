// app/components/__tests__/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders the title', () => {
    render(<MyComponent title="Hello, Jest!" />);
    expect(screen.getByText('Hello, Jest!')).toBeInTheDocument();
  });
});

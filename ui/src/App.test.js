import { render, screen } from '@testing-library/react';
import App from './App';
import TopNav from './components/TopNav';
import Content from './components/Content';

jest.mock('./components/TopNav');
jest.mock('./components/Content');

describe("that the App Component", () => {

  beforeEach(() => {
    TopNav.mockImplementation(() => <p>TopNavComponent</p>);
    Content.mockImplementation(() => <p>ContentComponent</p>);
    render(<App />);
  });

  it('renders TopNav component', () => {
    const navElement = screen.getByText('TopNavComponent');
    expect(navElement).toBeInTheDocument();
  });

  it('renders Content component', () => {
    const contentElement = screen.getByText('ContentComponent');
    expect(contentElement).toBeInTheDocument();
  });

});
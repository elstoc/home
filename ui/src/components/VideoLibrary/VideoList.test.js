import { render, screen } from '@testing-library/react';
import VideoList from './VideoList';
import Video from './Video';

jest.mock('./Video');

describe("that the VideoList Component", () => {

  beforeEach(() => {
    Video.mockImplementation(() => <p>VideoComponent</p>);
  });

  it('returns "no videos found" when passed an empty props array', () => {
    render(<VideoList videos={[]} />);
    const element = screen.getByText('No Videos Found');
    expect(element).toBeInTheDocument();
  });

  it('does not return "no videos found" when passed a 3-element props array', () => {
    render(<VideoList videos={[1,2,3]} />);
    const element = screen.queryByText('No Videos Found');
    expect(element).toBeNull();
  });

  it('returns no Videos when passed an empty props array', () => {
    render(<VideoList videos={[]} />);
    const element = screen.queryByText('VideoComponent');
    expect(element).toBeNull();
  });

  it('returns 3 Videos when passed a 3-element props array', () => {
    render(<VideoList videos={[1,2,3]} />);
    const elements = screen.getAllByText('VideoComponent');
    expect(elements).toHaveLength(3);
  });

});
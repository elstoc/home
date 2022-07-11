import { render, screen, fireEvent } from "@testing-library/react";
import ImdbSearch from "./ImdbSearch";

describe("that the ImdbSearch Component", () => {

  it('shows title label when showSearch is true', () => {
    render(<ImdbSearch showSearch={true} />);
    const element = screen.getByText('Video Title');
    expect(element).toBeVisible();
  });

  it('does not show title label when showSearch is false', () => {
    render(<ImdbSearch showSearch={false} />);
    const element = screen.queryByText('Video Title');
    expect(element).toBeNull();
  });

  it('defaults the title to props.searchTitle', () => {
    render(<ImdbSearch showSearch={true} searchTitle="A Search Title" />);
    const element = screen.getByDisplayValue('A Search Title');
    expect(element).toBeInTheDocument();
  });

  it('allows the title to be edited', () => {
    render(<ImdbSearch showSearch={true} searchTitle="A Search Title" />);
    const element = screen.getByDisplayValue('A Search Title');
    fireEvent.input(element, {target: {value: 'Another Search Title'}})
    expect(element).toHaveValue('Another Search Title');
  });

});

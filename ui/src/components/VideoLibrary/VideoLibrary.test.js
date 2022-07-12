import { render, screen } from '@testing-library/react';
import VideoLibrary from './VideoLibrary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useGQLQuery, useGQLQueryThrow } from '../../hooks/mockAPIClient';
import { APIContext } from '../../hooks/APIClient';

const queryClient = new QueryClient();

import VideoAdd from './VideoAdd';
import VideoFilter from './VideoFilter';
import ImdbSearch from './ImdbSearch';

jest.mock('./VideoAdd');
jest.mock('./VideoFilter');
jest.mock('./ImdbSearch');

describe("that the VideoLibrary Component", () => {

  beforeEach(() => {
    //mock implementations here are mostly because I'm still learning Jest
    //and because react testing library tries to encourage you to look at rendered
    //content (I might have used classes as an alternative otherwise)
    VideoAdd.mockImplementation(() => <p>VideoAddComponent</p>);
    VideoFilter.mockImplementation(() => <p>VideoFilterComponent</p>);
    ImdbSearch.mockImplementation(() => <p>ImdbSearchComponent</p>);
    render(
      <APIContext.Provider value={useGQLQuery}>
        <QueryClientProvider client={queryClient}>
          <VideoLibrary />
        </QueryClientProvider>
      </APIContext.Provider>
    );
  });

  it('contains the videolib header', () => {
    const element = screen.getByText('Video Library');
    expect(element).toBeInTheDocument();
  });

  it('renders the VideoAdd component', () => {
    const element = screen.getByText('VideoAddComponent');
    expect(element).toBeInTheDocument();
  });

  it('renders the VideoFilter component', () => {
    const element = screen.getByText('VideoFilterComponent');
    expect(element).toBeInTheDocument();
  });

  it('renders the ImdbSearch component', () => {
    const element = screen.getByText('ImdbSearchComponent');
    expect(element).toBeInTheDocument();
  });

  it('renders "Loading..." (initially)', () => {
    const element = screen.queryByText(/Loading\.\.\./);
    expect(element).toBeInTheDocument();
  });

  it('renders each of the test videos (eventually)', async () => {
    //here mocking allows me to just test that the correct data is passed
    //since I haven't built the VideoList component yet
    let element = await screen.findByText(/2001/, {}, {timeout:2000});
    expect(element).toBeInTheDocument();
    element = await screen.findByText(/Amelie/, {}, {timeout:2000});
    expect(element).toBeInTheDocument();
    element = await screen.findByText(/American Gods/, {}, {timeout:2000});
    expect(element).toBeInTheDocument();
    element = await screen.findByText(/Book Thief/, {}, {timeout:2000});
    expect(element).toBeInTheDocument();
  });

});

describe("that the VideoLibrary Component", () => {

  it('shows an error when the API errors', async () => {
    VideoAdd.mockImplementation(() => <p>VideoAddComponent</p>);
    VideoFilter.mockImplementation(() => <p>VideoFilterComponent</p>);
    ImdbSearch.mockImplementation(() => <p>ImdbSearchComponent</p>);
    render(
      <APIContext.Provider value={useGQLQueryThrow}>
        <QueryClientProvider client={queryClient}>
          <VideoLibrary />
        </QueryClientProvider>
      </APIContext.Provider>
    );
    jest.spyOn(console, 'error').mockImplementation(() => {}); //don't show the error on the console
    const element = await screen.findByText(/Error\.\.\./, {}, { timeout: 2000 });
    expect(element).toBeInTheDocument();
  });

});

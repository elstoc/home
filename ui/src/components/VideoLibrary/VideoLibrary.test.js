import { render, screen } from '@testing-library/react';
import VideoLibrary from './VideoLibrary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useGQLQuery } from '../../hooks/mockAPIClient';
import { APIContext } from '../../hooks/APIClient';

const queryClient = new QueryClient();

import VideoAdd from './VideoAdd';
import VideoFilter from './VideoFilter';
import ImdbSearch from './ImdbSearch';
import VideoList from './VideoList';

jest.mock('./VideoAdd');
jest.mock('./VideoFilter');
jest.mock('./ImdbSearch');
jest.mock('./VideoList');

describe("that the VideoLibrary Component", () => {

  beforeEach(() => {
    //mock implementations here are mostly because I'm still learning Jest
    //and because react testing library tries to encourage you to look at rendered
    //content (I might have used classes as an alternative otherwise)
    VideoAdd.mockImplementation(() => <p>VideoAddComponent</p>);
    VideoFilter.mockImplementation(() => <p>VideoFilterComponent</p>);
    ImdbSearch.mockImplementation(() => <p>ImdbSearchComponent</p>);
    VideoList.mockImplementation((props) => {
      return (
        <p>VideoListComponent {JSON.stringify(props.videos)}</p>
      );
    });
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

  it('renders the VideoList component (eventually) with input props data', async () => {
    //here mocking allows me to just test that the correct data is passed
    //since I haven't built the VideoList component yet
    const element = await screen.findByText(/VideoListComponent.*2,3,4/, {}, {timeout:2000});
    expect(element).toBeInTheDocument();
  });

});
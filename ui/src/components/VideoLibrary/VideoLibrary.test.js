import { render, screen } from '@testing-library/react';
import VideoLibrary from './VideoLibrary';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

import VideoAdd from './VideoAdd';
import VideoFilter from './VideoFilter';
import ImdbSearch from './ImdbSearch';
import VideoList from './VideoList';
import useGQLQuery from '../../hooks/useGQLQuery';

jest.mock('./VideoAdd');
jest.mock('./VideoFilter');
jest.mock('./ImdbSearch');
jest.mock('./VideoList');
jest.mock('../../hooks/useGQLQuery');

describe("that the VideoLibrary Component", () => {

  beforeEach(() => {
    VideoAdd.mockImplementation(() => <p>VideoAddComponent</p>);
    VideoFilter.mockImplementation(() => <p>VideoFilterComponent</p>);
    ImdbSearch.mockImplementation(() => <p>ImdbSearchComponent</p>);
    VideoList.mockImplementation((props) => {
      return (
        <p>VideoListComponent {JSON.stringify(props.videos)}</p>
      );
    });
    useGQLQuery.mockImplementation(() => {
      return { "data": { videoList: [2,3,4] }, "isLoading": false, "error": '' };
    });
  });

  it('contains the videolib header', () => {
    render(<QueryClientProvider client={queryClient}><VideoLibrary /></QueryClientProvider>);
    const element = screen.getByText('Video Library');
    expect(element).toBeInTheDocument();
  });

  it('renders the VideoAdd component', () => {
    render(<QueryClientProvider client={queryClient}><VideoLibrary /></QueryClientProvider>);
    const element = screen.getByText('VideoAddComponent');
    expect(element).toBeInTheDocument();
  });

  it('renders the VideoFilter component', () => {
    render(<QueryClientProvider client={queryClient}><VideoLibrary /></QueryClientProvider>);
    const element = screen.getByText('VideoFilterComponent');
    expect(element).toBeInTheDocument();
  });

  it('renders the ImdbSearch component', () => {
    render(<QueryClientProvider client={queryClient}><VideoLibrary /></QueryClientProvider>);
    const element = screen.getByText('ImdbSearchComponent');
    expect(element).toBeInTheDocument();
  });

  it('renders the VideoList component with input props data', () => {
    render(<QueryClientProvider client={queryClient}><VideoLibrary /></QueryClientProvider>);
    const element = screen.getByText(/VideoListComponent.*2,3,4/);
    expect(element).toBeInTheDocument();
  });

  it('does not render "Loading..." (when not loading)', () => {
    render(<QueryClientProvider client={queryClient}><VideoLibrary /></QueryClientProvider>);
    const element = screen.queryByText(/Loading\.\.\./);
    expect(element).not.toBeInTheDocument();
  });

  it('renders "Loading..." (when loading)', () => {
    useGQLQuery.mockImplementation(() => {
      return { data: {}, isLoading: true, error: '' };
    });
    render(<QueryClientProvider client={queryClient}><VideoLibrary /></QueryClientProvider>);
    const element = screen.getByText(/Loading\.\.\./);
    expect(element).toBeInTheDocument();
  });

});
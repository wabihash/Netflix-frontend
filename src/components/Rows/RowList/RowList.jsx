import React from 'react'
import Row from '../Row/Row'
import requests from '../../../utilis/Request'
import ErrorBoundary from './ErrorBoundary' // Adjust path if needed

const RowList = () => {
    return (
        <>
            <ErrorBoundary>
                <Row
                    title="NETFLIX ORIGINALS"
                    fetchUrl={requests.fetchNetflixOriginals}
                    isLargeRow={true}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
            </ErrorBoundary>
            <ErrorBoundary>
                <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
            </ErrorBoundary>
            <ErrorBoundary>
                <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            </ErrorBoundary>
            <ErrorBoundary>
                <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            </ErrorBoundary>
            <ErrorBoundary>
                <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
            </ErrorBoundary>
            <ErrorBoundary>
                <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
            </ErrorBoundary>
            <ErrorBoundary>
                <Row title="TV Shows" fetchUrl={requests.fetchTVShows} />
            </ErrorBoundary>
            <ErrorBoundary>
                <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
            </ErrorBoundary>
        </>
    )
}

export default RowList
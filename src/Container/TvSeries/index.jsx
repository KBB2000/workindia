import  React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import CardMoviesComponents from '../../Components/CardMovies';
import PaginationComponent from '../../Components/Pagination';

import LeftListBarComponent from '../../Components/LeftListBar';
import useGenres from '../../Hooks/useGenres';

const  TvSeriesContainer = ()=>{
    const [content, setContent] = useState([]);

    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const [pageno, setPageno] = useState(1)
    const [paginationno, setPaginationno] = useState(0)
    // const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE;

    
    const genreforURL = useGenres(selectedGenres)
    const GetDataTrending = async ()=>{
        
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=66a020f88a5c19a54cb50a66ae131b35&language=en-US&page=1=${pageno}&with_genres=&language=en-US&with_genres=${genreforURL}`)
        setContent(data.results);
        setPaginationno(data.total_pages);
    }

    useEffect(()=>{
        console.log('Trending Component did mount');
        GetDataTrending();
        //eslint-disable-next-line
    }, [])

    useEffect(()=>{
        GetDataTrending();
        //eslint-disable-next-line
    }, [pageno, genreforURL])

    const handleClick = (number)=>{
        setPageno(number);
    }
    useEffect(()=>{
        console.log('Trending Component didupdate mount');
        GetDataTrending();
        //eslint-disable-next-line
    }, [pageno])
    return (
        <main className='homePage'>
            <Container>
                <Row>
                    <Col className='col-12'>
                        <section>
                            <h1 className='txtCenter'>Top Trending TV Series</h1>
                            <h3 className='txtCenter'> For You</h3>
                        </section>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-2'>
                        <LeftListBarComponent genres={genres} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}  setGenres={setGenres} type="tv" setPage={setPageno}/> 
                    </Col>
                    <Col className='col-10'>
                        <Row>
                                {
                                    content && content.length > 0 ? content.map((item, index)=>{
                                        return (<CardMoviesComponents key={index} data={item} mediaType="tv"/>)
                                    }) : 'Loading ....'
                                }

                            {
                                paginationno && paginationno > 1 ? <PaginationComponent maxnum={paginationno} activenum={pageno} handleClick={handleClick}/> : ''
                            }
                        </Row>
                    </Col>
                    
                </Row>
            </Container>
        </main>
    )
}

export default TvSeriesContainer;
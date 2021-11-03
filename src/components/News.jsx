import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { selectSearchInput, setBlogData } from '../features/userSlice'

import { Box, Grid } from '@material-ui/core';

export default function News() {

    const searchInput = useSelector(selectSearchInput)
    const api_key = process.env.REACT_APP_GNEWS_API_KEY
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=${api_key}`

    const dispatch = useDispatch()
    const [news, setNews] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get(blog_url)
            .then((response) => {
                dispatch(setBlogData(response.data))
                setNews(response.data)
                console.log(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [searchInput])

    return (
        <div>
            <h1>NewsDux</h1>
            {loading ? <h1>Loading...</h1> : ""}
            <div className="blogs">
                {news?.articles?.map(news => (
                    <a className="blog" target="__blank" href={news.url}>
                        <div>
                            <img src={news.image} />
                            <div>
                                <h3 className="sourceName">
                                    <span>{news.source.name}</span>
                                    <span>{news.publishedAt}</span>
                                </h3>
                                <h1>{news.title}</h1>
                                <p>{news.description}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

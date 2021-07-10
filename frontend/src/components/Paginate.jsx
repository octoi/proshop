import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Paginate({ pages, page, keyword = '', isAdmin = false }) {

    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }

    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map(x => {
                    x = x + 1
                    return (
                        <LinkContainer
                            key={x}
                            to={!isAdmin
                                ? `/?keyword=${keyword}&page=${x}`
                                : `/admin/productlist/?keyword=${keyword}&page=${x}`
                            }
                        >
                            <Pagination.Item active={page === x}>{x}</Pagination.Item>
                        </LinkContainer>
                    )
                })}
            </Pagination>
        )
    )
}

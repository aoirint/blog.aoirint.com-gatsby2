import React from 'react'
import { graphql, PageProps } from "gatsby"

import {
    GetTagSearchQuery
} from '../../generated/graphql-types'
import { Helmet } from 'react-helmet'
import { Navbar } from '.'
import PostListItem from './PostListItem'

const TagSearch: React.FC<PageProps<GetTagSearchQuery>> = ({
    pageContext,
    data,
}) => {
    const tag = 'tag' in pageContext ? String(pageContext['tag']) : ''

    return (
        <>
            <Helmet>
                <title>Tag: {tag} · えやみぐさ</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <Navbar />
            <section className='section'>
                <div className='container'>
                    <h2 className='title is-4 mb-4'>
                        Tag: {tag}
                    </h2>
                    <ul>
                        {data.posts.edges.map(({ node }) => (
                            <PostListItem post={node} />
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}

export const pageQuery = graphql`
    query GetTagSearch(
        $tag: String!
    ) {
        posts: allMdx(
            filter: {
                frontmatter: {
                    tags: {
                        in: [$tag]
                    }
                }
            }
        ) {
            edges {
                node {
                    id
                    slug
                    parent {
                        ... on File {
                            sourceInstanceName
                        }
                    }
                    frontmatter {
                        title
                        date
                        updated
                        category
                        tags
                    }
                }
            }
        }
    }
`

export default TagSearch
import React, { useState } from 'react';
import { getEntries } from 'src/library/contentful/client';
import PostCard from 'pages/posts/components/PostCard';
import {
	load_more_container,
	load_more_button,
} from 'styles/components_style/posts.module.css';
import Button from 'src/library/common/components/Button';
import Helmet from 'src/library/common/components/Helmet';
import { STRINGS } from 'src/library/common/constants/strings';

const initialPostList = 6;
const loadMorePostList = 3;

const Post = ({ posts }) => {
	const [
		displayPosts,
		setDisplayPosts,
	] = useState(initialPostList);
	const [
		articles,
	] = useState(posts);

	const loadMore = () => {
		setDisplayPosts(displayPosts + loadMorePostList);
	};
	return (
		<article className='section'>
			<Helmet title={STRINGS.BLOG} />
			{articles
				.slice(0, displayPosts)
				.map((post, i) => <PostCard keyPost={post.fields.slug} post={post} />)}
			{
				displayPosts < articles.length ? <div className={load_more_container}>
					<Button
						variant={load_more_button}
						onClick={loadMore}
						title={STRINGS['BUTTON']['LOAD_MORE']}
					/>
				</div> :
				null}
		</article>
	);
};

export const getStaticProps = async () => {
	const response = await getEntries({ content_type: 'blog' });
	const items = response?.items || [];
	
	return {
		props : {
			posts      : items,
			revalidate : 60,
		},
	};
};

export default Post;

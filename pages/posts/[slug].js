import React from 'react';
import { getEntries } from 'src/library/contentful/client';
import { useRouter } from 'next/router';
import PostHeader from './components/PostHeader';
import PostBody from './components/PostBody';
import Helmet from '../../src/library/common/components/Helmet';

const Post = ({ post, preview }) => {
	const router = useRouter();
	if (!post) return;
	const { title, description, picture } = post.fields;
	return (
		<section className='section'>
			{preview && <div>Preview Alert</div>}
			<div className='container'>
				<article>
					{
						router.isFallback ? <div>Loading....</div> :
						<div>
							<Helmet
								title={title}
								image={picture.fields.file.url}
								description={description}
							/>
							<PostHeader post={post} />
							<PostBody post={post} />
						</div>}
				</article>
			</div>
		</section>
	);
};

export const getStaticProps = async ({ params, preview = false }) => {
	const { slug } = params;
	const response = await getEntries({
		content_type  : 'blog',
		'fields.slug' : slug,
	});
	console.log(response, 'response');
	const items = response?.items || [];

	if (!items.length) {
		return {
			redirect : {
				destination : '/posts',
				permanent   : false,
			},
		};
	}

	return {
		props : {
			post       : items[0],
			preview,
			revalidate : 60,
		},
	};
};

export const getStaticPaths = async () => {
	const response = await getEntries({ content_type: 'blog' });
	const items = response?.items || [];
	const paths = items.map((item) => ({
		params : { slug: item.fields.slug },
	}));

	return {
		paths,
		fallback : true,
	};
};

export default Post;

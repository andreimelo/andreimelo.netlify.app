import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from 'src/library/common/components/Button';
import {
	projects_wrapper,
	heading,
	carousel,
	arrow,
	viewport,
	track,
	card,
	active_card,
	side_card,
	browser_bar,
	browser_dots,
	browser_url,
	card_image,
	card_content,
	project_title,
	project_description,
	tags,
	tag,
	actions,
	live_demo,
	view_source,
	dots,
	dot,
	dot_active,
	feature_strip,
	feature_item,
	feature_icon,
	feature_text,
} from 'styles/pages_style/projects.module.css';
import { STRINGS } from 'src/library/common/constants/strings';

function getWrappedIndex(index, total){
	if(total === 0){
		return 0;
	}

	return (index + total) % total;
}

function getProjectPosition(projectIndex, activeIndex, total){
	const normalized = (projectIndex - activeIndex + total) % total;

	if(normalized === 0){
		return {
			role  : 'center',
			order : 2,
		};
	}

	if(normalized === 1){
		return {
			role  : 'right',
			order : 3,
		};
	}

	if(normalized === total - 1){
		return {
			role  : 'left',
			order : 1,
		};
	}

	return {
		role  : 'hidden',
		order : 4,
	};
}

function Projects(){
	const projects = STRINGS.PROJECTS_SECTION.ITEMS;
	const totalProjects = projects.length;

	const [
		activeIndex,
		setActiveIndex,
	] = useState(0);

	const activeProject = projects[activeIndex];

	function openProjectLink(link){
		if(!link || link === '#' || typeof window === 'undefined'){
			return;
		}

		window.open(link, '_blank', 'noopener,noreferrer');
	}

	function handlePrevious(){
		setActiveIndex((prev) => getWrappedIndex(prev - 1, totalProjects));
	}

	function handleNext(){
		setActiveIndex((prev) => getWrappedIndex(prev + 1, totalProjects));
	}

	if(totalProjects === 0){
		return null;
	}

	return (
		<section id={STRINGS.NAVIGATION_DATA[2]} className={projects_wrapper}>
			<h2 className={heading}>{STRINGS.PROJECTS_SECTION.TITLE}</h2>

			<div className={carousel}>
				{totalProjects > 1 &&
				<button className={arrow} onClick={handlePrevious} aria-label='Show previous project'>
					‹
				</button>
					}
				<div className={viewport}>
					<div className={track}>
						{projects.map((project, index) => {
							const projectPosition = getProjectPosition(index, activeIndex, totalProjects);

							if(projectPosition.role === 'hidden'){
								return null;
							}

							const isActive = projectPosition.role === 'center';
							const cardClass =
								isActive ? `${card} ${active_card}` :
								`${card} ${side_card}`;

							return (
								<motion.article
									layout
									className={cardClass}
									key={project.title}
									style={{ order: projectPosition.order }}
									animate={{
										opacity : isActive ? 1 : 0.55,
										scale   : isActive ? 1 : 0.9,
										x       :
											projectPosition.role === 'left' ? -10 :
											projectPosition.role === 'right' ? 10 :
											0,
										filter  : isActive ? 'blur(0px)' : 'blur(0.3px)',
									}}
									transition={{
										layout : { duration: 0.44, ease: [0.22, 1, 0.36, 1] },
										default: { duration: 0.34, ease: 'easeOut' },
									}}
								>
										<div className={browser_bar}>
											<div className={browser_dots}>
												<span />
												<span />
												<span />
											</div>
											<span className={browser_url}>{project.urlLabel}</span>
										</div>

										<img src={project.image} alt={`${project.title} preview`} className={card_image} />

										<div className={card_content}>
											<h3 className={project_title}>{project.title}</h3>
											<p className={project_description}>{project.description}</p>

											<div className={tags}>
												{project.tags.map((item) => (
													<span className={tag} key={`${project.title}-${item}`}>
														{item}
													</span>
												))}
											</div>

											{isActive && (
												<div className={actions}>
													<Button
														variant={live_demo}
														title={STRINGS.PROJECTS_SECTION.BUTTONS.LIVE_DEMO}
														onClick={() => openProjectLink(project.liveDemo)}
													/>
													<Button
														variant={view_source}
														title={STRINGS.PROJECTS_SECTION.BUTTONS.VIEW_SOURCE}
														onClick={() => openProjectLink(project.source)}
													/>
												</div>
											)}
										</div>
								</motion.article>
							);
						})}
					</div>
				</div>
				{totalProjects > 1 &&
				<button className={arrow} onClick={handleNext} aria-label='Show next project'>
					›
				</button>
				}
			</div>
				{totalProjects > 1 && (	
					<div className={dots}>
						{projects.map((project, index) => (
							<button
								key={project.title}
								className={index === activeIndex ? `${dot} ${dot_active}` : dot}
								onClick={() => setActiveIndex(index)}
								aria-label={`Show ${project.title}`}
							/>
						))}
					</div>
				)}
			<div className={feature_strip}>
				{activeProject?.features.map((feature) => (
					<div className={feature_item} key={`${activeProject.title}-${feature.title}`}>
						<span className={feature_icon}>{feature.icon}</span>
						<div>
							<p className={feature_text}>{feature.title}</p>
							<p>{feature.text}</p>
						</div>
					</div>
				))}
			</div>
			<hr/>
		</section>
	);
}

export default Projects;

import { projects_wrapper } from 'styles/pages_style/projects.module.css';
import { STRINGS } from 'src/library/common/constants/strings';
// import GitHubCalendar from 'react-github-calendar';

function Projects(){
	return (
		<section id={STRINGS.NAVIGATION_DATA[2]} className={projects_wrapper}>
			<h2>{STRINGS.NAVIGATION_DATA[2]} </h2>
			{/* <GitHubCalendar username='andreimelo' colorScheme='light' /> */}
			<hr />
		</section>
	);
}

export default Projects;

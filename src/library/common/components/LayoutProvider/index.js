import React from 'react';
import PropTypes from 'prop-types';
import { container } from 'styles/components_style/layoutprovider.module.css';
import { ThemeProvider } from 'src/library/common/context/ThemeContext';

function LayoutProvider({ children }){
	return (
		<ThemeProvider>
			<main className={container}>{children}</main>
		</ThemeProvider>
	);
}

LayoutProvider.propTypes = {
	children : PropTypes.node.isRequired,
};

export default React.memo(LayoutProvider);

import React from 'react';

const Footer = () => {

	return (
		<div className="fixed bottom-0 left-0 w-full z-40 bg-gray-50 border-t border-gray-200 px-4 py-2 shadow">
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex items-center text-xs text-gray-500">
					<div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
					<span>DataFlow v0.1.0</span>
				</div>
				<div className="text-xs text-gray-500">
					© 2025 DataFlow
				</div>
			</div>
		</div>
	);
};

export default Footer;
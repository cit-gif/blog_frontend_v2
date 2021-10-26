import { useAppContext } from '@src/contexts/AppContext';
import React, { useEffect } from 'react';
import parse from 'html-react-parser';
export default function CommentFB() {
	const { dataAppSettings } = useAppContext();
	if (dataAppSettings?.plugins?.scriptsHeaderFB && dataAppSettings?.plugins?.commentsFB) {
		return <div className="my-4">{parse(dataAppSettings.plugins.commentsFB)}</div>;
	}
	return null;
}

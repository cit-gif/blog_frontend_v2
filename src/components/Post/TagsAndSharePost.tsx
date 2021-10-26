import { tagArticleInterface } from '@src/interfaceGlobal';
import React from 'react';
import { useRouter } from 'next/router';
import {
	EmailIcon,
	EmailShareButton,
	FacebookIcon,
	FacebookShareButton,
	HatenaShareButton,
	InstapaperShareButton,
	LineShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	LivejournalShareButton,
	MailruShareButton,
	OKShareButton,
	PinterestIcon,
	PinterestShareButton,
	PocketShareButton,
	RedditShareButton,
	TelegramIcon,
	TelegramShareButton,
	TumblrShareButton,
	TwitterIcon,
	TwitterShareButton,
	ViberShareButton,
	VKShareButton,
	WhatsappShareButton,
	WorkplaceShareButton,
} from 'react-share';
import { httpUrl } from '@src/config/constrant';
import TagLink from '../TagLink';

interface Props {
	data?: tagArticleInterface[];
}
interface dataShareInterface {
	buttonELement: any;
	tooltip: string;
	icon: any;
}
export default function TagsAndSharePost(props: Props) {
	const { data } = props;
	const router = useRouter();
	const dataShare: dataShareInterface[] = [
		{
			buttonELement: FacebookShareButton,
			tooltip: 'Chia sẻ qua Facebook',
			icon: FacebookIcon,
		},
		{
			buttonELement: TelegramShareButton,
			tooltip: 'Chia sẻ qua Telegram',
			icon: TelegramIcon,
		},
		{
			buttonELement: LinkedinShareButton,
			tooltip: 'Chia sẻ qua Linkedin',
			icon: LinkedinIcon,
		},
		{
			buttonELement: TwitterShareButton,
			tooltip: 'Chia sẻ qua Twitter',
			icon: TwitterIcon,
		},
		// {
		// 	buttonELement: PinterestShareButton,
		// 	tooltip: 'Chia sẻ qua Pinterest',
		// 	icon: PinterestIcon,
		// },
	];
	const tagsName = data?.map(tag => tag.name) || [];
	const urlShare = httpUrl.slice(0, httpUrl.length - 1) + router.asPath;
	return (
		<div className="flex flex-col my-8 gap-4">
			<div className="w-full flex items-center flex-wrap gap-2">
				<span className="text-base font-semibold mr-2">Tags:</span>
				{data && (
					<div className="flex flex-wrap gap-1">
						{data.map((tag, key) => (
							<TagLink key={key} data={{ slug: tag.slug, name: tag.name }} />
						))}
					</div>
				)}
			</div>
			<div className="flex items-center gap-1">
				<span className="text-base font-semibold mr-2">Chia sẻ:</span>
				<div className="flex items-center gap-1">
					{dataShare.map((item, key) => (
						<div className="tooltip" data-tip={item.tooltip} key={key}>
							<item.buttonELement url={urlShare} hashtag={tagsName}>
								<item.icon size={35} borderRadius={10} />
							</item.buttonELement>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

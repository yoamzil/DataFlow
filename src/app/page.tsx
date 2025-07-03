import { requireAuth } from '../lib/requireAuth';
import HomeContent from './HomeContent';

export default async function Home() {
	await requireAuth();
	return <HomeContent />;
}
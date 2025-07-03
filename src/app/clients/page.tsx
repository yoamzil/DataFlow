import { getClients } from '../../actions/clients';
import ClientsTable from './ClientsTable';
import { requireAuth } from '../../lib/requireAuth';

export default async function ClientsPage() {
	await requireAuth();
	const clients = await getClients();
	return <ClientsTable initialClients={clients} />;
}
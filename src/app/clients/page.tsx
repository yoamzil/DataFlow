import { getClients } from '../../actions/clients';
import ClientsTable from './ClientsTable';

export default async function ClientsPage() {
	const clients = await getClients();
	return <ClientsTable initialClients={clients} />;
}
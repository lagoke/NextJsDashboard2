import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  // Await the params if they are being passed as a promise (ensure params is synchronous first)
  const { id } = params;

  // Fetch the invoice and customers data
  const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);

  // Handle the case where the invoice is not found
  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}

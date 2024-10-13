import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};

interface PageProps {
  params: Promise<{ id: string }>; // Handle params as a Promise
}

export default async function Page({ params }: PageProps) {
  // Await the params since they are now treated as a Promise
  const { id } = await params;

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

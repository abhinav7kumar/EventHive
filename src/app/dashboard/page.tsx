import { redirect } from 'next/navigation';

// This page is deprecated and redirects to the new attendee dashboard.
export default function DashboardPage() {
    redirect('/attendee');
}

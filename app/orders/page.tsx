import { BottomNav } from '@/components/layout/BottomNav';




export default function OrdersPage() {
    return (
        <div className="min-h-screen bg-[#f9f9f7] flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>
            <p className="text-[#1a1a1a]/60">You have no active orders.</p>
            <BottomNav />

        </div>
    );
}

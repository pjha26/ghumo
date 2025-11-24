import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)', padding: '20px' }}>
            <SignIn />
        </div>
    );
}

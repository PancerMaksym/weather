import { useUserserStore } from "../store/users"


export function Menu() {
    const { users, fetchNewUser} = useUserserStore()

    return(
        <>
            <ul>
            {users.map((user) => (
                !user.isLoading ?
                    <li key={user.user?.id}>
                        <strong>{user.user?.title} {user.user && 'first' in user.user ? user.user.first + user.user.last:null}</strong>
                    </li>
                    : <div>Loading...</div>
                
            ))}
            </ul>
            <button onClick={fetchNewUser}>NewUser</button>
        </>
    )
}
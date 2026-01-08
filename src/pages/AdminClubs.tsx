import { assignClubAdmin, createClub, getClubs, getClubAdmins} from "../api/clubs.admin.api";


import { useEffect, useState } from "react";




export default function AdminClubs() {
    const [clubs, setClubs] = useState<any[]>([]);
    const [adminsMap, setAdminsMap] = useState<Record<number, any[]>>({});
    const [clubName, setClubName] = useState<string>("");
    const [clubCountry, setClubCountry] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

       useEffect(() => {
        loadData();
        
    }, []);

    const loadData = async () => {
      try{
        setLoading(true);
                const clubsData = await getClubs();
                setClubs(clubsData);
                // preload admins for each club
                try {
                    const adminsList = await Promise.all(clubsData.map(async (c: any) => {
                        const list = await getClubAdmins(c.id);
                        return { clubId: c.id, list: Array.isArray(list) ? list : [] };
                    }));
                    const map: Record<number, any[]> = {};
                    adminsList.forEach((a) => { map[a.clubId] = a.list; });
                    setAdminsMap(map);
                } catch (err) {
                    console.error('Failed to preload admins for clubs', err);
                }
      } catch(error){
        console.error("Failed to load clubs", error);
      }finally {
        setLoading(false);
      }
    };

    const handleCreateClub = async()=>{
        try{
            if(!clubName && !clubCountry){
                alert("Please provide club name and country");
                return;
            }
             await createClub({name: clubName, country: clubCountry});

            setClubName("");
            setClubCountry("");
            loadData();
        }catch(error){
            console.error("Failed to create club", error);
            alert("Failed to create club");
        }

    }

        // helper to (re)load admins for a specific club
        const loadAdminsForClub = async (clubId: number) => {
            try {
                const list = await getClubAdmins(clubId);
                setAdminsMap((m) => ({ ...m, [clubId]: Array.isArray(list) ? list : [] }));
            } catch (error) {
                console.error('Failed to load club admins for', clubId, error);
            }
        };

    const cancelForm = ()=>{
        setShowCreateForm(false);
        setClubName("");
        setClubCountry("");
    }

    const handleAssignAdmin = async(clubId:number, userId:number)=>{
        try{
            await assignClubAdmin(clubId, userId);
            alert("Club admin assigned successfully");
            // refresh clubs and admins
            await loadData();
        }catch(error){
            console.error("Failed to assign club admin", error);
            alert("Failed to assign club admin");
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Clubs</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage your clubs and assign administrators
                            </p>
                        </div>
                        <button
                            onClick={() => setShowCreateForm(!showCreateForm)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add club
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Create Club Form */}
                {showCreateForm && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">Create new club</h2>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Club name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        placeholder="Enter club name"
                                        value={clubName}
                                        onChange={(e) => setClubName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Country
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                        placeholder="Enter country"
                                        value={clubCountry}
                                        onChange={(e) => setClubCountry(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                            <button
                                onClick={() => cancelForm()}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateClub}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Create club
                            </button>
                        </div>
                    </div>
                )}

                {/* Clubs List */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">
                            All clubs
                            <span className="ml-2 text-sm font-normal text-gray-500">
                                ({clubs.length})
                            </span>
                        </h2>
                    </div>
                    
                    {loading ? (
                        <div className="px-6 py-12 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-sm text-gray-500">Loading clubs...</p>
                        </div>
                    ) : clubs.length === 0 ? (
                        <div className="px-6 py-12 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No clubs</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by creating a new club.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Club
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Country
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Administrator
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Assign admin
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {clubs.map((club) => (
                                        <tr key={club.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <span className="text-blue-600 font-semibold text-sm">
                                                            {club.name.substring(0, 2).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {club.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{club.country}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {club.admin ? (
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                            <span className="text-gray-600 font-medium text-xs">
                                                                {club.admin.name.substring(0, 2).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div className="ml-3">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {club.admin.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                        Not assigned
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select
                                                    className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    onFocus={() => loadAdminsForClub(club.id)}
                                                    onChange={(e) => {
                                                        if (e.target.value) {
                                                            handleAssignAdmin(club.id, adminsMap[club.id].find(a => a.id === parseInt(e.target.value)).id);
                                                        }
                                                    }}
                                                    defaultValue=""
                                                >
                                                    <option value="">Select admin</option>
                                                    {(adminsMap[club.id] || []).map((admin) => (
                                                        <option key={admin.id} value={admin.id}>
                                                            {admin.name} ({admin.email})
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
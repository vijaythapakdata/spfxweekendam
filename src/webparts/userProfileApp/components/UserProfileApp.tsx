import * as React from 'react';
import styles from './UserProfileApp.module.scss';
import type { IUserProfileAppProps } from './IUserProfileAppProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { AadHttpClient,HttpClientResponse} from '@microsoft/sp-http';
interface IUserProfile{
  displayName:string;
  mail:string;
  jobTitle?:string;
  department?:string;
  officeLocation?:string;
  mobilePhone?:string;
  id:string
}
//we need to provide ms graph url
const GRAPH_RESOURCE_URL='https://graph.microsoft.com';

// END POINT
const GRAPH_ME_ENPOINT='https://graph.microsoft.com/v1.0/me';

const UserProfileApp:React.FC<IUserProfileAppProps>=({ aadHttpClientFactory })=>{
  const [profile,setProfile]=React.useState<IUserProfile|any>(null);
  const [loading,setLoading]=React.useState<boolean>(false);
  const [error,setError]=React.useState<string|null>(null);
  const [fetched,setFetched]=React.useState<boolean>(false);

  //aadhttpcleint call

  const fetchuserProfile=React.useCallback(async():Promise<void>=>{
setLoading(true);
setError(null);

try{
  //step 1: Aadhhttpclien  get clinet automatically get the token for graph api
  const client:AadHttpClient=await aadHttpClientFactory.getClient(GRAPH_RESOURCE_URL);
  //step 2 get request send
  const response:HttpClientResponse=await client.get(GRAPH_ME_ENPOINT,AadHttpClient.configurations.v1);

  //step 3 check the response is ok or not
  if(!response.ok){
    throw new Error(`Graph API responded with status ${response.status}`);
  }
  //step 4 parse the response
  const data:IUserProfile=await response.json();
  setProfile(data);
  setFetched(true);
}
catch(err:unknown){
  const msg=err instanceof Error?err.message:'An unknown error occurred';
  setError(msg);
}
finally{
  setLoading(false);
}
  },[aadHttpClientFactory]);

  React.useEffect(()=>{
    fetchuserProfile();
  },[fetchuserProfile]);
return(
  <>
  <div className={styles.container}>
<h2 className={styles.title}>👤 My Profle<span className={styles.badge}>AadHttpclient</span></h2>

{/* Loading state */}
{loading&&(
  <div className={styles.loadingBox}>
    <div className={styles.spinner}></div>
    <span >We are fetching data from Microsoft Graph Api</span>
    </div>
)}
{/* Error state */}
{error&&(
  <div className={styles.errorBox}>
    <strong>❌Error</strong>{error}
    <button className={styles.retryBtn} onClick={fetchuserProfile}>Retry</button>
    </div>
)}

{/* Profile data */}
{fetched&&profile&&!loading&&(
  <div className={styles.profileCard}>
    {/* Avatar */}
    <div className={styles.avatar}>
      {profile.displayName?.charAt(0).toUpperCase()??'?'}
      </div>

  </div>
)}

{/* Information rows */}
<div className={styles.infoGrid}>
  <ProfileRow icon="👤" label="Name" value={profile.displayName} />
  <ProfileRow icon="✉️" label="Email" value={profile.mail} />
  <ProfileRow icon="💼" label="Job Title" value={profile.jobTitle} />
  <ProfileRow icon="🏢" label="Department" value={profile.department} />
  <ProfileRow icon="📍" label="Office Location" value={profile.officeLocation} />
  <ProfileRow icon="📱" label="Mobile Phone" value={profile.mobilePhone} />
</div>
{/*  */}

<details className={styles.rawJson}>
  <summary> 🔎Raw JSON</summary>
  <pre>{JSON.stringify(profile, null, 2)}</pre>
</details>
{/* manual */}
{fetched&&!loading&&(
  <button className={styles.refreshBtn} onClick={fetchuserProfile}>
    🔄️ Refresh
  </button>
)}
</div>

</>
)
}
// Small helpers
interface IProfileRowProps{
  icon:string;
  label:string;
  value:string|null|undefined;
}
const ProfileRow:React.FC<IProfileRowProps>=({icon,label,value})=>(
  <div className={styles.infoRow}>
    <span className={styles.infoIcon}>{icon}</span>
    <span className={styles.infoLabel}>{label}</span>
    <span className={styles.infoValue}>{value}</span>
  </div>
)
export default UserProfileApp;


import useAuth from "../../hooks/useAuth";

const UPdateProfile = () => {
  const { user } = useAuth();

  return (
    <section className="bg-[#F9F9FB]">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 text-[#212B36] mb-6 mt-5">
          <h4>Home</h4>
          <span>/</span>
          <h4>Update Profile</h4>
        </div>

        <section className="flex">
          {/* left part */}
          <div>
            <div>
              <img src={user?.photoURL} alt="" />
            </div>
            <div>
              <h4>{user?.displayName}</h4>
              <h6>
                <span>Last logged in: </span>
                {user?.metadata?.lastSignInTime}
              </h6>
            </div>
          </div>

          {/* right part */}
          <div></div>
        </section>
      </div>
    </section>
  );
};

export default UPdateProfile;

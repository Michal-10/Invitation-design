

export default () => {
// export default observer(() => {

    // const dispatch = useDispatch<AppDispatch>();

    return (<>
        <nav style={{
            position: "absolute",
            top: "40px",
            left: "20px",
            width: "50%",
            display: "flex",
            justifyContent: "space-around",
            justifyItems: "center",
            gap: '10px',
            fontSize: "20px",
            padding: "8px 12px",
            marginRight: '3%',
        }}>
            {/* <Link style={{ marginLeft: '4vw', color: 'rosybrown' }} to="/" ><img style={{ paddingBottom: '10px', width: '50px', height: '50px', borderRadius: '50%' }} src="./../img/logo.png" alt="logo" /></Link>
            <Link style={{ color: 'rosybrown', marginRight: '15px' }} to="/Home" >Home </Link>
            <Link style={{ color: 'rosybrown', marginRight: '15px' }} to="/About" > About</Link>
            <Link style={{ color: 'rosybrown', marginRight: '15px' }} to="/RecipesList" > Recipes</Link>

            {LoginStore.IsLogged === 'after' &&
                <Link onClick={() => dispatch(setIsOpenAddModal(true))} style={{ color: 'rosybrown', marginRight: '15px' }} to="/AddRecipe" > Add-Recipe</Link>
            } */}

        </nav>
    </>)
};
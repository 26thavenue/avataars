

const App = () => {
  return (
    
    <div
    style={{
      backgroundImage: "linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)"
    }}
     className="p-24 min-h-screen border-dashed flex items-center justify-center ">
      <div className="max-w-2xl flex flex-col gap-4 ">
        <h1 className="text-5xl text-white  font-bold text-center ">Generate dynamic avatars on the fly</h1>
        <h4 className="text-2xl leading-10 ">Create unique avatars for your users in seconds , just open the modal select your shapes and other details and download , then you are good to go</h4>

        <button> Generate Avatar</button>
      </div>
      
    </div>
  )
}

export default App

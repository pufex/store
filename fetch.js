export const getData = async () =>{
  const res = await fetch('https://fakestoreapi.com/poducts');
  if(!res.ok){
    location.assign("404.html");
    throw new Error('Failed to fetch data');
  } 
  try{
    const data = await res.json();
    return data;
  }catch(err){
    console.log('err');
  }finally{
    console.log('finally');
  }
};



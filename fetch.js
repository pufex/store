export const getData = async () =>{
  const res = await fetch('https://fakestoreapi.com/products');
  if(!res.ok) throw new Error('Failed to fetch data');
  try{
    const data = await res.json();
    return data;
  }catch(err){
    console.log(err);
  }finally{
    console.log('finally');
  }
};



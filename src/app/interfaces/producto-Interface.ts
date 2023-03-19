export interface productoInteface {
    id_producto: number;
    nombre_producto: string;
    descripcion_producto: string;
    precio_producto: number;
    cantidad_producto: number;
    stock: Notification;
    codigo_producto: string;
    id_categoria_producto: number;

}
export interface categoriaInterface{
    id_categoria_producto:number
    nombre_categoria_producto:string
    descripcion_categoria_producto:string
}
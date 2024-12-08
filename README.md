# MyAngularProject

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

แนะนำให้โหลดไฟล์จากใน googl drive เพราะใน git hub มันไม่แยก folder fontend และ backend 
ทำให้ใน github มันมีแค่ไฟล์ frontend


อย่างแรก เปิด Terminal ที่เป็น cmd แล้ว cd ไปที่ Folder Angular-Backend จากนั้นให้รันทั้ง 4 คำสั่งด้านล่างเพื่อติดตั้ง
pip install Flask
pip install -U flask-cors
pip install pymysql
pip install bcrypt

ต่อมาเปิดอีก Terminal ที่เป็น cmd แล้ว cd myangularbooking เสร็จแล้วรันคำสั่ง ng serve -o
เปิด xampp start Apache and MySQL
import database โดยการสร้าง new database ชื่อ angular_database utf8_general_ci กดสร้าง และเลือก import ไฟล์ angular_database.sql
หลังจากหน้าเว็ป angular เปิดได้แล้วให้ไปที่ app.py กดปุ่ม run ด้านขวาบน เพื่อ start server api หน้าเว็ป angular ก็จะแสดงข้อมูลต่างๆ

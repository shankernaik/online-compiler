using JSengineApi.Data;
using Microsoft.AspNetCore.Mvc;
using Moq;
using JSengineApi.Controllers;
using SourceCode = JSengineApi.Models.SourceCode;
using Microsoft.EntityFrameworkCore;
using MockQueryable.Moq;
namespace JSengineApiTest
{
    public class controllerTest
    {
        [Fact]
        public async Task Getsourcecode_Test200status()
        {
            //data mock   
            List<SourceCode> list;
            Guid id;//id new
            SourceCodeController controller;//object
            list = new List<SourceCode>();
            id = new Guid();
            list.Add(new SourceCode() //add list sourcecode dummy
            {
                Code = "Code",
                Id = id,
                Output = "Output"
            });
            list.Add(new SourceCode() //add list sourcecode dummy
            {
                Code = "Code",
                Id = new Guid(),
                Output = "Output"
            });
            var mockDbSet = list.AsQueryable().BuildMockDbSet();
            mockDbSet.Setup(x => x.FindAsync(It.IsAny<Guid>())).ReturnsAsync(new SourceCode() //add list sourcecode dummy
            {
                Code = "Code",
                Id = id,
                Output = "Output"
            });
            //class interface
            var mockDb = new Mock<ISourceCodeDbContext>();
            //mock object sourcecode list will call->set method
            mockDb.Setup(s => s.SourceCodes).Returns(mockDbSet.Object);
            Console.WriteLine("-------------" + mockDb.Object.SourceCodes);
            //act
            controller = new SourceCodeController(mockDb.Object);
            IActionResult res = await controller.GetSourceCode(id);
            //assert
            OkObjectResult result = Assert.IsType<OkObjectResult>(res);
            Assert.Equal(result.StatusCode, 200);


        }
        [Fact] //should run by the server
        public async Task Getsourcecode_Test404status()
        {
            //data mock   
            List<SourceCode> list;
            System.Guid id;//new id
            SourceCodeController controller;//object

            list = new List<SourceCode>();
            id = new System.Guid();
            list.Add(new SourceCode() //add sourcecode list to dummy data
            {
                Code = "Code",
                Id = id,
                Output = "Output"
            });
            //class interface
            var mockDb = new Mock<ISourceCodeDbContext>(); //extracting SourceCodeDbContext interface 
            //mock object sourcecode list will call->set method
            mockDb.Setup(s => s.SourceCodes).Returns(SourceCodeDbMockData.GetMockDbSet<SourceCode>(list));

            //act
            controller = new SourceCodeController(mockDb.Object);

            IActionResult res = await controller.GetSourceCode(new System.Guid());
            //assert
            NotFoundResult result = Assert.IsType<NotFoundResult>(res);
            Assert.Equal(result.StatusCode, 404);
        }
        //post
        [Fact]
        public async Task AddCodeToDatabase_Test200status()
        {
            List<SourceCode> list;
            System.Guid id;
            SourceCodeController controller;
            list = new List<SourceCode>();
            id = new System.Guid();
            var mockDb = new Mock<ISourceCodeDbContext>();
            mockDb.Setup(s => s.SourceCodes).Returns(SourceCodeDbMockData.GetMockDbSet<SourceCode>(list));
            controller = new SourceCodeController(mockDb.Object);
            var res = controller.AddCodeToDatabase(new SourceCode()
            {
                Code = "Code",
                Id = id,
                Output = "Output"
            });
            System.Console.WriteLine("res -----" + res.Result);
            Assert.Equal(res.IsCompleted, true);
        }
        [Fact]
        public async Task Runcode_Test200status()
        {
            List<SourceCode> list;
            System.Guid id;
            SourceCodeController controller;
            list = new List<SourceCode>();
            id = new System.Guid();
            var mockDb = new Mock<ISourceCodeDbContext>();
            mockDb.Setup(s => s.SourceCodes).Returns(SourceCodeDbMockData.GetMockDbSet<SourceCode>(list));
            controller = new SourceCodeController(mockDb.Object);
            var res = controller.RunCode(new SourceCode()
            {
                Code = "Code",
                Id = id,
                Output = "Output"
            });
            //assert
            OkObjectResult result = Assert.IsType<OkObjectResult>(res);
            Assert.Equal(result.StatusCode, 200);
        }
        private static Mock<DbSet<T>> GetDbSetMock<T>(IEnumerable<T> items = null) where T : class
        {
            if (items == null)
            {
                items = new T[0];
            }
            var dbSetMock = new Mock<DbSet<T>>();
            var q = dbSetMock.As<IQueryable<T>>();
            q.Setup(x => x.GetEnumerator()).Returns(items.GetEnumerator);
            return dbSetMock;
        }
    }
}
